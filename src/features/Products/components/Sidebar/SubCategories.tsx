
interface SubCategory {
  name: string;
  href: string;
}

interface SubCategoriesListProps {
  subCategories: SubCategory[];
}

function SubCategoriesList({ subCategories }: SubCategoriesListProps) {
  return (
    <ul role='list' className='space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900'>
      {subCategories.map((category) => (
        <li key={category.name}>
          <a href={category.href}>{category.name}</a>
        </li>
      ))}
    </ul>
  )
}

export default SubCategoriesList
