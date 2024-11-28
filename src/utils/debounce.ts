export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ) => {
    let timeout: NodeJS.Timeout;
  
    return (...args: Parameters<T>): Promise<ReturnType<T>> => {
      return new Promise((resolve) => {
        if (timeout) {
          clearTimeout(timeout);
        }
  
        timeout = setTimeout(() => {
          resolve(func(...args));
        }, wait);
      });
    };
  };