interface Props {
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
}
export function ProductDetailPolicySection({
  warrantyInformation,
  shippingInformation,
  returnPolicy,
}: Props) {
  return (
    <section className='flex flex-col items-center gap-8'>
      <h2 className='text-2xl font-semibold'>Policy</h2>
      <dl className='p-4 rounded-md bg-gray-500 text-white-primary'>
        <div className='flex gap-2 mb-2'>
          <dt>Warranty information: </dt>
          <dd>{warrantyInformation}</dd>
        </div>
        <div className='flex gap-2 mb-2'>
          <dt>Shipping information: </dt>
          <dd>{shippingInformation}</dd>
        </div>
        <div className='flex gap-2 mb-2'>
          <dt>Rerturn policy: </dt>
          <dd>{returnPolicy}</dd>
        </div>
      </dl>
    </section>
  );
}
