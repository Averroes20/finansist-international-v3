type Props = {
  firstWord: string;
  words: string[];
};

const TextScramble: React.FC<Props> = ({ words, firstWord }) => {
  return (
    <div className="font-extrabold font-dosis text-xl md:text-3xl  bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-80% to-white">
      {firstWord}{' '}
      <span className="text-yellow-100 inline-flex flex-col h-[calc(theme(fontSize.xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] overflow-hidden">
        <ul className="block animate-text-slide-5 text-left leading-tight [&_li]:block">
          {words.map((word, index) => (
            <li key={`word-${index + 1}`}>{word}</li>
          ))}
          <li aria-hidden="true">Efficient</li>
        </ul>
      </span>
    </div>
  );
};

export default TextScramble;
