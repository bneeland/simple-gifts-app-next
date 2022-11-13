import { TITLE_PREFIX } from '../constants'
import Head from 'next/head'
import {
  Input,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'

const emptyPersonInput = { name: '', email: '' }
const emptyRuleInput = { from: '', to: '', type: '' }
const ruleTypes = [
  { id: 'must', label: 'must give to' },
  { id: 'mustNot', label: 'must not give to' },
]

export default function Home() {
  const [personInput, setPersonInput] = useState(emptyPersonInput)
  const [people, setPeople] = useState([])
  const [ruleInput, setRuleInput] = useState(emptyRuleInput)
  const [rules, setRules] = useState([])

  const createPersonHandler = (e) => {
    e.preventDefault()
    setPeople([...people, personInput])
    setPersonInput(emptyPersonInput)
  }

  const createRuleHandler = (e) => {
    e.preventDefault()
    setRules([...rules, ruleInput])
    setRuleInput(emptyRuleInput)
  }

  return (
    <div>
      <Head>
        <title>Simple Gifts - People</title>
        <meta name="description" content="Draw names for a gift exchange" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Gift exchange config</div>
      <div>
        <div>People</div>
        <div>
          {people.map(person => (
            <div key={person.email}>
              <div>{person.name}</div>
              <div>{person.email}</div>
            </div>
          ))}
        </div>
        <div>Create person</div>
        <form onSubmit={createPersonHandler}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" placeholder="John Doe" value={personInput.name} onChange={(e) => setPersonInput({ ...personInput, name: e.target.value })} />
            <FormHelperText>Can be first name, or first and last name, or even a nickname.</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" placeholder="john.doe@example.com" value={personInput.email} onChange={(e) => setPersonInput({ ...personInput, email: e.target.value })} />
            <FormHelperText>Make sure this is an active email address—this person will be getting his match at this address.</FormHelperText>
          </FormControl>
          <Button type="submit">Submit</Button>
        </form>
      </div>
      <div>
        <div>Rules</div>
        <div>
          {rules.map(rule => (
            <div key={`${rule.from}-${rule.to}-${rule.type}`}>
              <div>{rule.from}</div>
              <div>{rule.to}</div>
              <div>{rule.type}</div>
            </div>
          ))}
        </div>
        <div>Create rule</div>
        <div>{ruleInput.from}</div>
        <div>{ruleInput.to}</div>
        <div>{ruleInput.type}</div>
        <form onSubmit={createRuleHandler}>
          <FormControl isRequired>
            <FormLabel>From</FormLabel>
            <Select placeholder="Select a person" value={ruleInput.from} onChange={(e) => setRuleInput({ ...ruleInput, from: e.target.value })}>
              {people.map(person => (
                <option value={person.email} key={person.email}>{person.name}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>To</FormLabel>
            <Select placeholder="Select a person" value={ruleInput.to} onChange={(e) => setRuleInput({ ...ruleInput, to: e.target.value })}>
              {people.map(person => (
                <option value={person.email} key={person.email}>{person.name}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Type</FormLabel>
            <Select placeholder="Select a type" value={ruleInput.type} onChange={(e) => setRuleInput({ ...ruleInput, type: e.target.value })}>
              {ruleTypes.map(ruleTypes => (
                <option value={ruleTypes.id} key={ruleTypes.id}>{ruleTypes.label}</option>
              ))}
            </Select>
          </FormControl>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  )
}
