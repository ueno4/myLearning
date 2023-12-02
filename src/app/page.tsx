'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import {
  useAppContext,
  useAppDispatch,
  AppParamType,
  initAppState,
} from '@/context/AppContext';
import { TextTranslator } from '@/components/page/TextTranslator';
import { ImageTranslator } from '@/components/page/ImageTranslator';
import { DocumentTranslator } from '@/components/page/DocumentTranslator';
import { WebTranslator } from '@/components/page/WebTranslator';
import { LanguageSelectBar } from '@/components/page/LanguageSelectBar';

export default function Home() {
  const state = useAppContext();
  const dispatch = useAppDispatch();

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sl = searchParams.get('sl');
    const tl = searchParams.get('tl');
    const text = searchParams.get('text');
    const op = searchParams.get('op');
    const newObj: AppParamType = {
      sl: sl ?? state?.sl,
      tl: tl ?? state?.tl,
      text: text ?? state?.text,
      op: op ?? state?.op,
    };
    dispatch({ type: 'initialize', payload: newObj });
  }, []);

  useEffect(() => {
    console.log(
      `re-render :: searchParams : ${searchParams.toString()}, state : ${JSON.stringify(
        state
      )}`
    );
    router.push(state?.url ?? '/');
  }, [state?.url]);

  return (
    <main className='flex h-full flex-col px-4 py-8 sm:p-16'>
      <section className='text-gray-700'>
        <LanguageSelectBar />
        {state?.op === 'texts' && <TextTranslator />}
        {state?.op === 'images' && <ImageTranslator />}
        {state?.op === 'docs' && <DocumentTranslator />}
        {state?.op === 'websites' && <WebTranslator />}
      </section>
    </main>
  );
}
