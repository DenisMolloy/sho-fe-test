export interface MenuLinks {
  subMenuLinks?: MenuLinks[]
  label: string
  slug: string
}

export interface Menu {
  name: string
  menuLinks: MenuLinks[]
}
