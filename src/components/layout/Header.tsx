import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAppContext, useAppDispatch } from '@/context/AppContext';

// refs : https://tailwindui.com/components/application-ui/application-shells/stacked
export const Header = () => {
  const state = useAppContext();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  return (
    <nav className='bg-gray-100'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='shrink'>
              <Image
                className='h-8 w-auto'
                src='/next.svg'
                alt='Next.js Logo'
                width={1}
                height={1}
                priority
              />
            </div>
            <div className='ml-4 sm:ml-6 sm:block'>
              <div className='flex space-x-4'>
                {[
                  { feat: 'Text', param: 'texts' },
                  { feat: 'Image', param: 'images' },
                  { feat: 'Document', param: 'docs' },
                  { feat: 'Web', param: 'websites' },
                ].map((obj) => {
                  return (
                    <Link
                      key={obj.feat}
                      href={`?sl=${state?.sl}&tl=${state?.tl}&op=${obj.param}`}
                      className={`text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
                        searchParams.get('op') === `${obj.param}`
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-700'
                      }`}
                      onClick={() =>
                        dispatch({
                          type: 'changeOperation',
                          payload: { op: obj!.param },
                        })
                      }
                    >
                      {obj.feat}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
