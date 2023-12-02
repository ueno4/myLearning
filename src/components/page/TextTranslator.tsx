import { useEffect, useRef, useState } from 'react';
import { useAppContext, useAppDispatch } from '@/context/AppContext';

export const TextTranslator = () => {
  const srcDivRef = useRef<HTMLDivElement>(null);
  const srcTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const tgtDivRef = useRef<HTMLDivElement>(null);
  const tgtTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const state = useAppContext();
  const dispatch = useAppDispatch();

  // const [srcContent, setSrcContent] = useState('');
  const [tgtContent, setTgtContent] = useState('');
  const [srcContentLength, setSrcContentLength] = useState(0);
  const [tgtContentLength, setTgtContentLength] = useState(0);

  useEffect(() => {
    // TODO: lg 以上は src と tgt で大きい方に合わせる
    const srcTxtAreaCurrent = srcTextAreaRef.current;
    const srcDivCurrent = srcDivRef.current;
    if (srcTxtAreaCurrent && srcDivCurrent) {
      srcTxtAreaCurrent.style.height = 'auto';
      srcTxtAreaCurrent.style.height = srcTxtAreaCurrent.scrollHeight + 'px';
      srcDivCurrent.style.height = 'auto';
      srcDivCurrent.style.height =
        srcDivCurrent.style.height + srcTxtAreaCurrent.style.height + 'px';
    }
    setSrcContentLength(state?.text?.length ?? 0);
    state?.text &&
      dispatch({ type: 'changeSourceContent', payload: { text: state?.text } });

    // translate
    setTgtContent(state?.text ?? '');

    const tgtTxtAreaCurrent = tgtTextAreaRef.current;
    const tgtDivCurrent = tgtDivRef.current;
    if (tgtTxtAreaCurrent && tgtDivCurrent) {
      tgtTxtAreaCurrent.style.height = 'auto';
      tgtTxtAreaCurrent.style.height = tgtTxtAreaCurrent.scrollHeight + 'px';
      tgtDivCurrent.style.height = 'auto';
      tgtDivCurrent.style.height =
        tgtDivCurrent.style.height + tgtTxtAreaCurrent.style.height + 'px';
    }
  }, [state?.text]);

  useEffect(() => {
    setTgtContentLength(tgtContent.length);
    const tgtTxtAreaCurrent = tgtTextAreaRef.current;
    const tgtDivCurrent = tgtDivRef.current;
    if (tgtTxtAreaCurrent && tgtDivCurrent) {
      tgtTxtAreaCurrent.style.height = 'auto';
      tgtTxtAreaCurrent.style.height = tgtTxtAreaCurrent.scrollHeight + 'px';
      tgtDivCurrent.style.height = 'auto';
      tgtDivCurrent.style.height =
        tgtDivCurrent.style.height + tgtTxtAreaCurrent.style.height + 'px';
    }
  }, [tgtContent]);

  return (
    <div className='px-5 py-5 mx-auto flex flex-wrap'>
      <div
        className='border-2 rounded-lg border-gray-200/50 my-1 w-full lg:w-1/2 justify-between'
        ref={srcDivRef}
      >
        <div className='relative flex'>
          <textarea
            className='text-gray-900 text-xl w-full h-auto p-2 pr-8 font-medium resize-none cursor-text rounded-lg overflow-hidden outline-2'
            value={state?.text}
            onChange={(e) =>
              dispatch({
                type: 'changeSourceContent',
                payload: { text: e.target.value },
              })
            }
            ref={srcTextAreaRef}
          ></textarea>
          <button
            type='button'
            className={`absolute right-0 top-0 h-6 w-6 m-2 rounded-full text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-transparent active:ring-gray-700 ${
              !state?.text && 'hidden'
            }`}
            onClick={() =>
              dispatch({
                type: 'clearSourceContent',
                payload: { text: '' },
              })
            }
          >
            <svg
              className='absolute right-0 top-0 h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <div>Text Count : {srcContentLength}</div>
      </div>
      <div
        className='bg-gray-100 border-2 rounded-lg border-gray-200/50 my-1 w-full lg:w-1/2 justify-between'
        ref={tgtDivRef}
      >
        <textarea
          className='bg-gray-100 text-gray-900 text-xl w-full h-auto p-2 font-medium resize-none cursor-text rounded-lg overflow-hidden outline-2'
          value={tgtContent}
          ref={tgtTextAreaRef}
          readOnly
        ></textarea>
        <div>Text Count : {tgtContentLength}</div>
      </div>
    </div>
  );
};
