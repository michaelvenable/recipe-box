import { useParams } from 'react-router-dom';

import Recipe from '../components/Recipe';

export default function RecipeView() {
  const { title } = useParams();
  return <Recipe title={title} />;
}
