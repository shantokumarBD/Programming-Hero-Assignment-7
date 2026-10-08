const CategoryLoading = () => {
  return (
    <div className="bg-bd-bg min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10">
        
     
        <div className="bg-white rounded-2xl p-6 md:p-8 flex items-center gap-6 shadow-sm border border-gray-100 mb-6 animate-pulse">
         
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200"></div>
     
          <div className="space-y-3">
            <div className="h-6 md:h-8 w-32 md:w-40 bg-gray-200 rounded-md"></div>
            <div className="h-4 w-48 md:w-60 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        
        <div className="bg-white rounded-xl p-4 flex justify-end items-center shadow-sm border border-gray-100 mb-8 animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded-md"></div>
        </div>

        <div>
          
          <div className="h-4 w-40 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm animate-pulse">
               
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gray-200"></div>
                  <div className="space-y-2">
                    <div className="h-5 w-28 bg-gray-200 rounded-md"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded-md"></div>
                  </div>
                </div>

              
                <div className="flex items-end justify-between">
                  <div className="space-y-2">
                    <div className="h-3 w-16 bg-gray-200 rounded-md"></div>
                    <div className="h-6 w-24 bg-gray-200 rounded-md"></div>
                  </div>
                  <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CategoryLoading;
