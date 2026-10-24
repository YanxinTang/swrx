import { useApi } from 'swrx';
import { getUser } from './api';

export function UserProfile({ id }: { id: number }) {
  const { data, error, isLoading } = useApi([getUser, id]);

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Request failed</p>;
  if (!data) return null;

  return (
    <article>
      <h2>{data.name}</h2>
      <p>{data.role}</p>
    </article>
  );
}
