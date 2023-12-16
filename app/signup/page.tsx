'use client'
import { useEffect, useState } from 'react'
import { TextInput, rem, Fieldset, PasswordInput, Button } from '@mantine/core'
import { IconAt, IconLock } from '@tabler/icons-react';
import Link from 'next/link'
import { useDisclosure } from '@mantine/hooks';

const SignUp = () => {
  const AtIcon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
  const LockIcon = <IconLock style={{ width: rem(16), height: rem(16) }} />;
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [visible, { toggle }] = useDisclosure(false)
  const [error, setError] = useState('')

  // useEffect(() => {
  //   if(password !== confirmPassword){
  //     setError("Passwords doesn't match")
  //   }
  //   else{
  //     setError('')
  //   }
  // }, [password, confirmPassword])

  function onSubmit() {
    console.log(userName, password)
    if(password !== confirmPassword){
      setError("Passwords doesn't match")
    }
    else{
      setError('')
    }
    
  }

  return (
    <div className='h-screen flex items-center justify-center'>
    <Fieldset className='w-1/2 flex flex-col space-y-4' legend="Personal information" variant="filled" radius="lg">
      <TextInput 
        leftSectionPointerEvents="none"
        leftSection={AtIcon} 
        label="Username" 
        placeholder='Enter Username'
        value={userName}
        onChange={(event) => setUserName(event.currentTarget.value)}
      />
      <PasswordInput 
        leftSection={LockIcon} 
        label="Password" 
        placeholder="Enter Password" 
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        visible={visible}
        onVisibilityChange={toggle}
        error={error}
      />
      <PasswordInput 
        leftSection={LockIcon} 
        label="Confirm Password" 
        placeholder="Enter Password" 
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.currentTarget.value)}
        visible={visible}
        onVisibilityChange={toggle}
        error={error}
      />
      <Button className='bg-indigo-500' onClick={onSubmit}>Submit</Button>
    <span>Don't have an account? <Link className='text-blue-500 underline' href='/signup'>signup</Link></span>
    </Fieldset>
    </div>
  )
}

export default SignUp