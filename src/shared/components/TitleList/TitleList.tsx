interface TitleListProps {
  title: string;
}
const TitleList = ({ title }: TitleListProps) => {
  return (
    <div className='pt-[50px]'>
      <span className=' border-indigo-600 border-l-4 font-bold text-2xl pl-5'>{title}</span>
    </div>
  )
}

export default TitleList
