import { ReactNode, Fragment } from 'react';

interface EntityPageLayoutProps {
    headerContent: ReactNode;
    actions?: ReactNode[];
    mainContent: ReactNode;
}

export default function EntityPageLayout({
  headerContent,
  actions,
  mainContent,
}: EntityPageLayoutProps) {
  return (
    <div className=" min-h-screen">
      <div className='flex flex-row '>
        <div className='hidden md:block bg-gradient-to-br from-green-500 to-blue-500 w-1/4 p-8 min-h-screen'>
{headerContent } 
        </div>
        
       
        <div className='flex flex-col gap-16 w-full md:w-3/4'>
            
          <div>
             
             
            <div className='bg-white w-full rounded-md min-h-[90dvh]'>
              <div className="w-full md:max-w-5xl 2xl:max-w-5xl mx-auto">
                
                <div className='px-4 py-12 lg:px-8'>
                  {(actions && actions.length > 0) ? (
            <div className='flex items-center justify-end mb-8'> 
              {actions.map((action, index) => (
                <Fragment key={index}>
                  {action}
                </Fragment>
              ))}
            </div>
          ) : <div className=""></div>}
                     {mainContent}
                </div>
              
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}