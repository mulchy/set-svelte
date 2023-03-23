type Config = {delay: number, times: number}

export function repeat({delay, times}: Config, fn: () => void) {
    function runAndReschedule(n: number) {
        fn()
        
        if (n < times) {
            setTimeout(() => runAndReschedule(n + 1), delay)
        }
    }
    
    setTimeout(() => runAndReschedule(1), delay)   
}