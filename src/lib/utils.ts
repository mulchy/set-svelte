type Config = { delay: number, times: number }

export function repeat({ delay, times }: Config, fn: () => void) {
    return new Promise<void>((resolve, reject) => {
        function runAndReschedule(n: number) {
            fn()
    
            if (n < times) {
                setTimeout(() => runAndReschedule(n + 1), delay)
            } else {
                resolve()
            }
        }

        setTimeout(() => runAndReschedule(1), delay)
    })
}