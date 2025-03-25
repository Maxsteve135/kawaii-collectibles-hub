
interface ShopResultsCountProps {
  count: number;
}

const ShopResultsCount = ({ count }: ShopResultsCountProps) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <p className="text-gray-500">
        Showing {count} {count === 1 ? 'result' : 'results'}
      </p>
    </div>
  );
};

export default ShopResultsCount;
