import { toast as hotToast } from 'react-hot-toast';

class ToastService {
  success(message: string) {
    hotToast.success(message, {
      duration: 3000,
      position: 'top-right',
    });
  }

  error(message: string) {
    hotToast.error(message, {
      duration: 5000,
      position: 'top-right',
    });
  }

  info(message: string) {
    hotToast(message, {
      duration: 3000,
      position: 'top-right',
    });
  }

  loading(message: string) {
    return hotToast.loading(message, {
      position: 'top-right',
    });
  }

  dismiss(toastId?: string) {
    if (toastId) {
      hotToast.dismiss(toastId);
    } else {
      hotToast.dismiss();
    }
  }
}

export const toast = new ToastService();