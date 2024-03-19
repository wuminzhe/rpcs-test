export const Result = ({ result }) => {
  return (
    <div class="w-full rounded shadow-lg flex justify-between mx-4 my-2 grid grid-cols-6">
      <div class="col-span-2 px-4 py-4">
        <a href={result.html_url} target="_blank" rel="noopener noreferrer">
          {result.full_name}
        </a>
      </div>

      <p class="col-span-1 px-4 py-4">
        <span role="img" aria-label="star">
          🌟
        </span>
        <strong>{result.stargazers_count}</strong>
      </p>

      <p class="col-span-3 px-4 py-4">{result.description}</p>
    </div>
  );
};
