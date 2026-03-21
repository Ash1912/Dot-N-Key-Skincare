import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { products, categories } from '../data/mockData';
import { Product } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Slider } from '../components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import { Filter, X } from 'lucide-react';
import { SEO } from '../utils/seo';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    let result = [...products];

    // Search filter
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter from URL
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      result = result.filter(p => p.category === categoryParam);
    }

    // Filter from URL (bestseller, new, offers)
    const filterParam = searchParams.get('filter');
    if (filterParam === 'bestseller') {
      result = result.filter(p => p.isBestSeller);
    } else if (filterParam === 'new') {
      result = result.filter(p => p.isNew);
    } else if (filterParam === 'offers') {
      result = result.filter(p => p.discount && p.discount > 0);
    }

    // Selected categories filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // Skin type filter
    if (selectedSkinTypes.length > 0) {
      result = result.filter(p =>
        p.skinType.some(type => selectedSkinTypes.includes(type))
      );
    }

    // Price range filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result = result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        result = result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [searchParams, selectedCategories, selectedSkinTypes, priceRange, sortBy]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSkinTypeToggle = (skinType: string) => {
    setSelectedSkinTypes(prev =>
      prev.includes(skinType)
        ? prev.filter(s => s !== skinType)
        : [...prev, skinType]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSkinTypes([]);
    setPriceRange([0, 2000]);
    setSortBy('featured');
    setSearchParams({});
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const FilterSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>

      {/* Categories */}
      <div>
        <Label className="font-semibold mb-3 block">Category</Label>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category.id}`}
                checked={selectedCategories.includes(category.slug)}
                onCheckedChange={() => handleCategoryToggle(category.slug)}
              />
              <label
                htmlFor={`cat-${category.id}`}
                className="text-sm cursor-pointer capitalize"
              >
                {category.name} ({category.productCount})
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Skin Type */}
      <div>
        <Label className="font-semibold mb-3 block">Skin Type</Label>
        <div className="space-y-2">
          {['all', 'dry', 'oily', 'combination', 'sensitive', 'acne-prone'].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`skin-${type}`}
                checked={selectedSkinTypes.includes(type)}
                onCheckedChange={() => handleSkinTypeToggle(type)}
              />
              <label htmlFor={`skin-${type}`} className="text-sm cursor-pointer capitalize">
                {type === 'all' ? 'All Skin Types' : type.replace('-', ' ')}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <Label className="font-semibold mb-3 block">
          Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
        </Label>
        <Slider
          min={0}
          max={2000}
          step={100}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mt-2"
        />
      </div>
    </div>
  );

  return (
    <>
      <SEO
        title="Shop All Skincare Products | Dot & Key"
        description="Browse our complete collection of premium skincare products. Serums, moisturizers, cleansers, sunscreens and more. Free shipping above ₹999"
        keywords="buy skincare, shop beauty products, serums online, moisturizers, cleansers"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            All Products
          </h1>
          <p className="text-gray-600">
            Showing {filteredProducts.length} products
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white border rounded-lg p-6">
              <FilterSection />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="py-4">
                    <FilterSection />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <Label>Sort by:</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                      Previous
                    </Button>
                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i}
                        variant={currentPage === i + 1 ? 'default' : 'outline'}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-4">No products found matching your criteria</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
