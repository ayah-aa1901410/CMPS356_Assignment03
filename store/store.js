import create from "zustand";
import { persist, devtools } from "zustand/middleware";


const store = (set) => ({
  query: "",
  words: [],
  setQuery: (newQuery) =>{
    set((state)=>({
      query: newQuery
    }))
  },
  setWords: (newWords) =>{
    set((state)=>({
      words: newWords
    }))
  },
  suggests:[],
  setSuggests: (newSuggests) => {
    set((state)=>({
      suggests: newSuggests
    }))
  },
  suggestWord:"u",
  setSuggestWord: (newSuggestWord) => {
    set((state)=>({
      suggestWord: newSuggestWord
    }))
  },
  starredWords: [],
  increase: (newStarred) =>
    set((state) => {
      const starredWords = [...state.starredWords];

      starredWords.push({
        word: newStarred.word,
      });

      return { ...state, starredWords };
    }),
  remove: (params) =>
    set((state) => {
      const starredWords = [...state.starredWords];
      const index = starredWords.findIndex((word) => word.word === params.word);

      if (index !== -1) {
        starredWords.splice(index, 1);
      }
      return { ...state, starredWords };
    })
});
  
  export const useStore = create(devtools(persist(store, { name: "store" })));