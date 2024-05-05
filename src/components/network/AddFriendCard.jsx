const AddFriendCard = () => {
  return (
    <>
      <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <a
          className="relative mx-3 mt-3 flex h-50 overflow-hidden rounded-xl"
          href="#"
        >
          <img
            className="object-cover"
            src="https://res.cloudinary.com/dd3v8dwin/image/upload/v1686280246/cld-sample.jpg"
            alt="product image"
          />
        </a>
        <div className="mt-4 px-5 pb-5">
          <a href="#">
            <h5 className="text-xl tracking-tight text-slate-900">
              Lahiru Vimukthi
            </h5>
          </a>
          <a
            href="#"
            className="flex items-center justify-center rounded-md bg-violet-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-2"
          >
            Add To Friend
          </a>
        </div>
      </div>
    </>
  );
};

export default AddFriendCard;
