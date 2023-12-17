import { Text, Autocomplete, rem, Card, Image, CardSection } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import NextImage from 'next/image';

export default function Home() {
  const searchIcon = <IconSearch style={{ width: rem(16), height: rem(16) }}/>

  return (
      <div className="h-screen flex flex-col justify-center items-center">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
        <CardSection>
        <Image
          src={'/images/home-page.jpg'}
          width={600}
          height={600}
          alt="No way!"
          radius="md"
          component={NextImage}
          // style={{ width: '100%', height: '100%' }}
        />
      </CardSection>
        <Text size='xl' my={5} className='flex justify-center font-bold'>Welcome to Book Paradise</Text>
        <Autocomplete leftSection={searchIcon} placeholder='Search for Books' data={['Book1', 'Book2']}/>
        </Card>

      </div>
  )
}
