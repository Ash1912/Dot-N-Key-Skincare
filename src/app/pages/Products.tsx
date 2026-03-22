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
import { Filter, X, Grid3x3, List, ChevronLeft, ChevronRight, TrendingUp, Clock, DollarSign, Star } from 'lucide-react';
import { SEO } from '../utils/seo';
import { motion, AnimatePresence } from 'framer-motion';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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

  const getActiveFiltersCount = () => {
    return selectedCategories.length + selectedSkinTypes.length + (priceRange[0] > 0 || priceRange[1] < 2000 ? 1 : 0);
  };

  const sortOptions = [
    { value: 'featured', label: 'Featured', icon: Star },
    { value: 'price-low', label: 'Price: Low to High', icon: DollarSign },
    { value: 'price-high', label: 'Price: High to Low', icon: DollarSign },
    { value: 'rating', label: 'Highest Rated', icon: TrendingUp },
    { value: 'newest', label: 'Newest First', icon: Clock },
  ];

  const FilterSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b">
        <h3 className="font-bold text-lg text-gray-800">Filters</h3>
        {getActiveFiltersCount() > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-purple-600 hover:text-purple-700">
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      {/* Categories */}
      <div>
        <Label className="font-semibold mb-3 block text-gray-700">Category</Label>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2 group">
              <Checkbox
                id={`cat-${category.id}`}
                checked={selectedCategories.includes(category.slug)}
                onCheckedChange={() => handleCategoryToggle(category.slug)}
                className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <label
                htmlFor={`cat-${category.id}`}
                className="text-sm cursor-pointer capitalize text-gray-600 group-hover:text-purple-600 transition-colors flex-1"
              >
                {category.name}
              </label>
              <span className="text-xs text-gray-400">{category.productCount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skin Type */}
      <div>
        <Label className="font-semibold mb-3 block text-gray-700">Skin Type</Label>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All Skin Types', icon: '✨' },
            { value: 'dry', label: 'Dry', icon: '💧' },
            { value: 'oily', label: 'Oily', icon: '🌟' },
            { value: 'combination', label: 'Combination', icon: '⚖️' },
            { value: 'sensitive', label: 'Sensitive', icon: '🌸' },
            { value: 'acne-prone', label: 'Acne Prone', icon: '🔬' },
          ].map((type) => (
            <div key={type.value} className="flex items-center space-x-2 group">
              <Checkbox
                id={`skin-${type.value}`}
                checked={selectedSkinTypes.includes(type.value)}
                onCheckedChange={() => handleSkinTypeToggle(type.value)}
                className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <label
                htmlFor={`skin-${type.value}`}
                className="text-sm cursor-pointer text-gray-600 group-hover:text-purple-600 transition-colors flex-1 flex items-center gap-2"
              >
                <span>{type.icon}</span>
                {type.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <Label className="font-semibold mb-3 block text-gray-700">
          Price Range
        </Label>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
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

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-3">All Products</h1>
              <p className="text-lg opacity-90">
                Discover our complete collection of premium skincare products
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Active Filters */}
          {getActiveFiltersCount() > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex flex-wrap gap-2"
            >
              {selectedCategories.map((cat) => (
                <div key={cat} className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  <span className="capitalize">{cat.replace('-', ' ')}</span>
                  <button onClick={() => handleCategoryToggle(cat)} className="ml-1 hover:text-purple-900">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {selectedSkinTypes.map((type) => (
                <div key={type} className="flex items-center gap-1 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">
                  <span className="capitalize">{type === 'all' ? 'All Skin Types' : type.replace('-', ' ')}</span>
                  <button onClick={() => handleSkinTypeToggle(type)} className="ml-1 hover:text-pink-900">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {(priceRange[0] > 0 || priceRange[1] < 2000) && (
                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  <span>₹{priceRange[0]} - ₹{priceRange[1]}</span>
                  <button onClick={() => setPriceRange([0, 2000])} className="ml-1 hover:text-green-900">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24 bg-white rounded-2xl shadow-lg p-6">
                <FilterSection />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  {/* Mobile Filter Button */}
                  <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <SheetTrigger asChild className="lg:hidden">
                      <Button variant="outline" className="rounded-full">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                        {getActiveFiltersCount() > 0 && (
                          <span className="ml-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {getActiveFiltersCount()}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[320px] sm:w-[400px]">
                      <div className="py-4">
                        <FilterSection />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Results Count */}
                  <p className="text-sm text-gray-500">
                    Showing <span className="font-semibold text-gray-700">{filteredProducts.length}</span> products
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2">
                    <Label className="text-sm text-gray-600">Sort by:</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px] rounded-full border-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <option.icon className="h-4 w-4" />
                              {option.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-full p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-500'}`}
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-full transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-500'}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <AnimatePresence mode="wait">
                {currentProducts.length > 0 ? (
                  <motion.div
                    key="products"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`grid gap-6 mb-8 ${
                      viewMode === 'grid' 
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                        : 'grid-cols-1'
                    }`}
                  >
                    {currentProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-16 bg-white rounded-2xl shadow-lg"
                  >
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Filter className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">No products found</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
                    <Button onClick={clearFilters} className="bg-gradient-to-r from-pink-500 to-purple-600">
                      Clear All Filters
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <div className="flex gap-1">
                    {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={i}
                          variant={currentPage === pageNum ? 'default' : 'outline'}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 rounded-full ${currentPage === pageNum ? 'bg-gradient-to-r from-pink-500 to-purple-600' : ''}`}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="rounded-full"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};