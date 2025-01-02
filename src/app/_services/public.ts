import publicAPI from '@core/api/public'

import { useQuery } from '@tanstack/react-query'

class PublicClientService {
  private static instance: PublicClientService
  private readonly api
  static readonly getInstance = (): PublicClientService => {
    return this.instance || (this.instance = new PublicClientService())
  }

  private constructor() {
    this.api = publicAPI
  }

  public useGetCategories = () => {
    const handleGetCategories = async () => {
      const { data } = await this.api.getCategories()
      return data
    }
    return useQuery({
      queryKey: ['GET_CATEGORIES'],
      queryFn: handleGetCategories,
      staleTime: Infinity,
    })
  }

  public useGetProvincesList = () => {
    const handleGetProvincesList = async () => {
      const { data } = await publicAPI.getProvincesList()
      return data
    }

    return useQuery({
      queryKey: ['GET_PROVINCES_LIST'],
      queryFn: handleGetProvincesList,
      staleTime: Infinity,
    })
  }

  public useGetDistrictsList = (provinceId: string) => {
    const handleGetDistrictsList = async () => {
      if (!provinceId) return []
      const { data } = await publicAPI.getDistrictsList(provinceId)
      return data
    }

    return useQuery({
      queryKey: ['GET_DISTRICTS_LIST', provinceId],
      queryFn: handleGetDistrictsList,
      staleTime: Infinity,
    })
  }

  public useGetWardsList = (districtId: string) => {
    const handleGetWardsList = async () => {
      if (!districtId) return []
      const { data } = await publicAPI.getWardsList(districtId)
      return data
    }

    return useQuery({
      queryKey: ['GET_WARDS_LIST', districtId],
      queryFn: handleGetWardsList,
      staleTime: Infinity,
    })
  }
}
const publicClientService = PublicClientService.getInstance()
export default publicClientService
