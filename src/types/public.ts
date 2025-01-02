export interface IPublicCategories {
  uuid: string
  name: string
  slug: string
  description: string
  sub: {
    uuid: string
    name: string
    slug: string
    description: string
  }[]
}

export interface IBaseProvince {
  id: string
  name: string
}

export interface IBaseDistrict {
  id: string
  name: string
  type: string
}

export interface IBaseWard {
  id: string
  name: string
  type: string
}
