import React, {useState} from 'react'
import { Card, CardSection, Text, Group, Badge, Pagination } from '@mantine/core'

interface BooksInterface {
    items: any[],
    kind: string,
    totalItems: number
  }

const Books: React.FC<{booksObj : BooksInterface; pageState: any[]}> = ({booksObj, pageState}) => {
    const {items, kind, totalItems} = booksObj
    const [activePage, setPage] = pageState

    return <>
        <div className='grid grid-cols-5 gap-6 mx-4'>
            {  
                items.map((book : any) => {
                    return (
                        <Card shadow="xl" padding="lg" radius="md" withBorder>
                            <CardSection>
                                <div className='w-30 h-80'>
                                    <img
                                        src={book.volumeInfo?.imageLinks?.thumbnail ?? '/images/default.jpg'}
                                        alt="No-way"
                                        className='rounded-lg object-center w-full h-full'
                                    />
                                </div>
                            </CardSection>
                        <Group className='mt-4 flex justify-between'>
                            <span className='w-3/5 text-sm font-bold truncate'>{book.volumeInfo?.title}</span>
                            <Badge color="blue">{book.volumeInfo?.language}</Badge>
                        </Group>
                        <Group mt="sm" className='flex justify-between w-full h-full object-center'>
                            <Text c="dimmed" size="sm">Authors: </Text>
                            <Text c="dimmed" size="sm" className='w-3/5 truncate'> {...(book.volumeInfo?.authors ?? ['unknown'])} </Text>
                        </Group>
                        <CardSection mx={1} my={1} className='h-15'>
                            <Text size='sm'>{book.volumeInfo?.subtitle}</Text>
                        </CardSection>
                        </Card>
                    )
                })
            }
        </div>
        <Pagination total={totalItems} value={activePage} onChange={setPage} siblings={2} className='m-4 flex justify-end'/>
        <br/>
    </>
}

export default Books