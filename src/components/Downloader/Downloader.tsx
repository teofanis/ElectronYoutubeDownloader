const Downloader = () => {
  return (
    <div className="flex items-baseline space-x-4 justify-around">
      <input
        placeholder="Enter Youtube URL"
        className="text-black
              flex-1
              placeholder-gray-800
              px-4 py-2.5 mt-2
              text-base transition duration-500 ease-in-out transform border-transparent rounded-lg
             bg-gray-300
              focus:border-blueGray-500
              focus:bg-gray-100
              focus:outline-none
              focus:shadow-outline
              focus:ring-2
              ring-offset-current ring-offset-2
               ring-gray-700"
      />

      <span className="flex font-semibold text-white text-xl">OR</span>
      <div className="flex flex-1">
        <label
          htmlFor="fileUpload"
          className="block bg-white rounded-lg flex-1"
        >
          <span className="sr-only">Choose a source file</span>
          <input
            id="fileUpload"
            type="file"
            className="block
                  w-full
                  text-base text-gray-800
                  file:mr-4
                  cursor-pointer
                  file:cursor-pointer
                  file:py-2.5 file:px-4
                  file:rounded-lg
                  border-blueGray-500
                  file:border-0
                  file:text-base
                  file:hover:bg-gray-100
                  file:font-semibold
                  file:bg-gray-300
                  file:text-gray-800
                  hover:file:bg-blueGray-500
                  focus:outline-none
                  focus:shadow-outline
                  focus:ring-2
                  ring-offset-current ring-offset-2
                ring-gray-700
                  transition duration-500 ease-in-out transform border-transparent rounded-lg
               "
          />
        </label>
      </div>
    </div>
  );
};

export default Downloader;
