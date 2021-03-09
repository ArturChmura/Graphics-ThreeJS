export function showTime(timeText: HTMLElement, time: Date) {
    const hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours().toString();
    const minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes().toString();
    const seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds().toString();
    timeText.innerHTML = hours + ':' + minutes + ':' + seconds;
}