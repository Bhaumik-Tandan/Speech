/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {
  const currentSentence=sentences[currentSentenceIdx];
  const renderSentenceWithHighlight=()=>{
    if(!currentSentence) return null;

    const [start,end]=currentWordRange;
    const before=currentSentence.slice(0,start);
    const word=currentSentence.slice(start,end);
    const after=currentSentence.slice(end);
    return (
      <p data-testid="current-sentence">
        {before}
        <span
        data-testid="current-word">
          {word}
        </span>
        {after}
      </p>
    )
  }
  return <div data-testid="currently-reading">
    <div>
      {sentences.map((sentences,idx)=>(
        <span key={idx}
        >
          {sentences}{' '}
        </span>
      ))}
    </div>
    {renderSentenceWithHighlight()}
  </div>;
};
