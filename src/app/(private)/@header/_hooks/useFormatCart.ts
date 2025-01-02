import { IBaseCart, IGetCartsRes } from '@core/types/payment'

interface IProps {
  data: IGetCartsRes[] | undefined | null
}
const useFormatCart = (props: IProps): IBaseCart[] => {
  if (!props.data) return []
  const { data } = props
  const variants = data
    .map(({ uuid, name, thumbnail, slug, status, salePrice, variants }) => {
      return variants.map(({ cart, ...variant }) => ({
        uuid: cart.uuid,
        quantity: cart.quantity,
        salePrice,
        productUuid: uuid,
        productName: name,
        productThumbnail: thumbnail,
        productStatus: status,
        productSlug: slug,
        variantUuid: variant.uuid,
        varianName: variant.name,
      }))
    })
    .flat()
  return variants
}

export default useFormatCart
