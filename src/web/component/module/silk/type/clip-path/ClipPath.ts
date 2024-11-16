export type ClipPath =
    | "none"
    | `inset(${string})`
    | `circle(${string})`
    | `ellipse(${string})`
    | `polygon(${string})`
    | `path(${string})`
    | "margin-box"
    | "border-box"
    | "padding-box"
    | "content-box"
    | `url(${string})`;