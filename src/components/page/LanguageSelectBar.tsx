import { useAppContext, useAppDispatch } from '@/context/AppContext';
import { ChangeEvent } from 'react';

export const LanguageSelectBar = () => {
  const state = useAppContext();
  const dispatch = useAppDispatch();
  const LangList = ['English', 'Japanese'];

  const onChangeLangList = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.id);
    switch (e.target.id) {
      case 'src-lang':
        dispatch({ type: 'selectSourceLang', payload: { sl: e.target.value } });
        break;
      case 'tgt-lang':
        dispatch({ type: 'selectTargetLang', payload: { tl: e.target.value } });
        break;
      default:
        break;
    }
  };

  const onClickToggleLang = () => {
    const newSrcLang = state?.tl;
    const newTgtLang = state?.sl;
    dispatch({
      type: 'toggleLang',
      payload: { sl: newSrcLang, tl: newTgtLang },
    });
  };

  return (
    <div className='px-5 mx-auto'>
      <div className='border-2 rounded-lg border-gray-200/50 py-5 w-full'>
        <div className='relative flex flex-1 items-center justify-center'>
          <div className='absolute left-0'>
            <label htmlFor='src-lang' className='sr-only'>
              Source Language
            </label>
            <select
              id='src-lang'
              name='src-lang'
              className='rounded-md border-0 bg-transparent mx-4 py-0 pl-2 pr-4 focus:ring-2 focus:ring-inset focus:ring-gray-500 text-lg'
              onChange={(e) => onChangeLangList(e)}
              value={state?.sl}
            >
              {LangList.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
          </div>
          <button
            type='button'
            className='p-2 rounded-full text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-transparent active:ring-gray-700'
            onClick={onClickToggleLang}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='1em'
              viewBox='0 0 448 512'
            >
              <path d='M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z' />
            </svg>
          </button>
          <div className='absolute left-1/2'>
            <label htmlFor='tgt-lang' className='sr-only'>
              Target Language
            </label>
            <select
              id='tgt-lang'
              name='tgt-lang'
              className='rounded-md border-0 bg-transparent mx-8 py-0 pl-2 pr-4 focus:ring-2 focus:ring-inset focus:ring-gray-500 text-lg'
              onChange={(e) => onChangeLangList(e)}
              value={state?.tl}
            >
              {LangList.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
