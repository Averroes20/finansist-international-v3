const TextScramble: React.FC = () => {
  const words = ['Efficient', 'Reliable', 'Precision', 'Trusted', 'Precision'];

  return (
    <div className="">
      <div className="font-extrabold text-3xl md:text-4xl [text-wrap:balance] bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-50% to-white">
        We Make It{' '}
        <span className="text-yellow-300 inline-flex flex-col h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] overflow-hidden">
          <ul className="block animate-text-slide-5 text-left leading-tight [&_li]:block">
            {words.map((word, index) => (
              <li key={`word-${index + 1}`}>{word}</li>
            ))}
            <li aria-hidden="true">Efficient</li>
          </ul>
        </span>
      </div>
    </div>
  );
};

export default TextScramble;
