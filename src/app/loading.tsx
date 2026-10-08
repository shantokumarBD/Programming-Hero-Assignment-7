const GlobalLoading = () => {
  return (
    <div className="bg-bd-bg min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        

        <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 mb-10 h-64 md:h-80 animate-pulse">
          
           <div className="h-full w-full bg-gray-50 rounded-xl"></div>
        </div>

     
        {[1, 2, 3].map((section) => (
          <div key={section} className="mb-10">
           
            <div className="h-6 w-48 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
              {[1, 2, 3].map((i) => (
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
        ))}

      </div>
    </div>
  );
};

export default GlobalLoading;
