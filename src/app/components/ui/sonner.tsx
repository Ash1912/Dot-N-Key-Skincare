import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg rounded-xl",
          title: "group-[.toast]:font-semibold",
          description: "group-[.toast]:text-gray-500",
          actionButton:
            "group-[.toast]:bg-purple-600 group-[.toast]:text-white group-[.toast]:rounded-lg",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-600 group-[.toast]:rounded-lg",
          success: "group-[.toaster]:bg-gradient-to-r group-[.toaster]:from-green-500 group-[.toaster]:to-emerald-600 group-[.toaster]:text-white group-[.toaster]:border-none",
          error: "group-[.toaster]:bg-gradient-to-r group-[.toaster]:from-red-500 group-[.toaster]:to-red-600 group-[.toaster]:text-white group-[.toaster]:border-none",
          warning: "group-[.toaster]:bg-gradient-to-r group-[.toaster]:from-orange-500 group-[.toaster]:to-amber-600 group-[.toaster]:text-white group-[.toaster]:border-none",
          info: "group-[.toaster]:bg-gradient-to-r group-[.toaster]:from-blue-500 group-[.toaster]:to-indigo-600 group-[.toaster]:text-white group-[.toaster]:border-none",
        },
      }}
      {...props}
    />
  );
};

// Custom toast functions with emojis and styling
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    icon: '🎉',
    duration: 3000,
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    icon: '❌',
    duration: 4000,
  });
};

export const showWarningToast = (message: string) => {
  toast.warning(message, {
    icon: '⚠️',
    duration: 3500,
  });
};

export const showInfoToast = (message: string) => {
  toast.info(message, {
    icon: 'ℹ️',
    duration: 3000,
  });
};

export const showCartToast = (productName: string) => {
  toast.success(`${productName} added to cart!`, {
    icon: '🛒',
    duration: 2000,
  });
};

export const showWishlistToast = (productName: string, added: boolean) => {
  if (added) {
    toast.success(`${productName} added to wishlist!`, {
      icon: '❤️',
      duration: 2000,
    });
  } else {
    toast.info(`${productName} removed from wishlist`, {
      icon: '💔',
      duration: 1500,
    });
  }
};

export { Toaster };