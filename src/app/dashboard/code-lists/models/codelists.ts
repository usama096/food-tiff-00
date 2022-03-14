export interface Codelist {
  name: string,
  description: string,
  isActive: boolean
}
export interface CodelistItem {
  codeListName: string,
  code: string,
  description: string,
  isActive: boolean,
  sortOrder: number,
  lang: string
}

