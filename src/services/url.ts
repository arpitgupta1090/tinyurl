export function idToShortUrl(id: number): string {
    let map = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let base62: number|string[] = []
    while (id > 0) {
        let reminder:number = id % 62
        base62.push(map[reminder])
        id = Math.floor(id / 62)

    }
    return base62.reverse().join("")
} 

export function shortUrlToId(shortURL: string): number {
    let id:number = 0
    for (const char of shortURL) { 
        if ('a' <= char && char <= 'z') 
            id = id * 62 + char.charCodeAt(0) - 'a'.charCodeAt(0); 
        if ('A' <= char && char <= 'Z') 
            id = id * 62 + char.charCodeAt(0) - 'A'.charCodeAt(0) + 26; 
        if ('0' <= char && char <= '9') 
            id = id * 62 + char.charCodeAt(0) - '0'.charCodeAt(0) + 52; 
    } 
    return id; 
}