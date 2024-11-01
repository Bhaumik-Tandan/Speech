const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();
    return json;
  } catch {
    return "<speak><s>There was an error</s></speak>";
  }
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
    const sentences: string []=[];
    let currentSentence:string='';
    let insideSTag: boolean=false;
    let i:number=0;
    while(i<content.length)
    {
        if(content.slice(i,i+3)==="<s>")
        {
            insideSTag=true;
            i+=3;
            continue;
        }

        if(content.slice(i,i+4)==="</s>")
        {
            if(insideSTag && currentSentence){
            sentences.push(currentSentence.trim());
            currentSentence='';
            }
            insideSTag=false;
            i+=4;
            continue;
        }
        if(content[i]==="<"){
            while(i<content.length && content[i]!==">")
                i++
            i++;
            continue;
        }
        if(insideSTag)
            currentSentence=content[i];
        i++;
    }
    return sentences;
};

export { fetchContent, parseContentIntoSentences };
