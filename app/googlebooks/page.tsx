import React from 'react'
import { Card, CardSection, Text, Group, Badge } from '@mantine/core'
import { promises as fs } from 'fs';

interface book {
    author: string,
    country: string,
    imageLink: string,
    language: string,
    link: string,
    pages: number,
    title: string,
    year: number
}

const books = async () => {
    const file = await fs.readFile(process.cwd() + '/app/books.json', 'utf8');
    const data = JSON.parse(file);
    // console.log(data)
    try {
        const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyCAI-qzoDv0koMTEh4L0Avinui0SLgwHVU');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const booksData = await response.json();
    
        console.log(booksData);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }

  return (
    <div className='mx-2 grid grid-cols-3 gap-8'>
        {
            data.map((book : book) => {
                return <>                
                    <Card shadow="xl" padding="lg" radius="md" withBorder>
                        <CardSection>
                        <div className='w-30 h-80'>
                            <img
                                src={`/${book.imageLink}`}
                                alt="No way!"
                                className='rounded-lg object-center w-full h-full'
                            />
                        </div>
                        </CardSection>
                        <Group className='mt-4 flex justify-between'>
                            <span className='w-3/5 text-sm truncate'>{book.title}</span>
                            <Badge color="blue">{book.language}</Badge>
                        </Group>
                        <Text></Text>
                    </Card>
                </>
            })
        }
    </div>
  )
}

export default books