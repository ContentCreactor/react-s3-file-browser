export interface Node {
    path: string,
    url: string,
    [key: string]: any
}

export interface MatchData {
    match: boolean,
    fragment: string
}
