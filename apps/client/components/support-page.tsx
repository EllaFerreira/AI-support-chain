'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { ToolResponse } from '@/lib/types';

const categories = [
  { value: 'technical', label: 'Technical Issue' },
  { value: 'billing', label: 'Billing Inquiry' },
  { value: 'other', label: 'Other' },
];

// const supportOptions = [
//   {
//     title: 'Self-Help Resources',
//     description: 'Access our knowledge base and guides.',
//     action: 'Explore',
//   },
//   {
//     title: 'Live Chat Support',
//     description: 'Connect with a support agent.',
//     action: 'Chat',
//   },
//   {
//     title: 'Schedule a Call',
//     description: 'Book a call with our support team.',
//     action: 'Schedule',
//   },
// ];

export function SupportPageComponent() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [data, setData] = useState<ToolResponse>();

  const handleCategorySelect = (value: string) => {
    setSelectedCategory(value);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ai/find-tickets`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            selectedCategory,
            userCode,
            issueDescription,
          }),
        },
      );

      if (!response.ok) {
        console.error('Error submitting ticket:', response.status);
        throw new Error('Failed to submit ticket');
      }

      const res: ToolResponse = await response.json();
      setData(res);
      setIsModalOpen(false);
      setUserCode('');
      setIssueDescription('');
      setShowOptions(true);
    } catch (error) {
      console.error('Error submitting ticket:', error);
    }
  };

  const handleOptionSelect = (action: string) => {
    console.log(`Selected option: ${action}`);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Support Hub</h1>
      {!showOptions ? (
        <>
          <p className="mb-4">
            Please select the category of your support ticket:
          </p>
          <Select onValueChange={handleCategorySelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit a Ticket</DialogTitle>
                <DialogDescription>
                  Please provide the user code and describe your issue.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="userCode" className="text-right">
                      User Code
                    </Label>
                    <Input
                      id="userCode"
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="issueDescription" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="issueDescription"
                      value={issueDescription}
                      onChange={(e) => setIssueDescription(e.target.value)}
                      className="col-span-3"
                      maxLength={200}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Submit Ticket</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">
            Choose a support option:
          </h2>
          <div className="flex flex-row gap-4 justify-between">
            {data && (
              <Card className="flex flex-col w-full">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{'Result'}</CardTitle>
                  <CardDescription className="text-sm">
                    {data.output}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow p-4"></CardContent>
                <CardFooter className="p-3 gap-3">
                  <Button
                    className="min-w-[350px] text-sm py-1"
                    onClick={() => handleOptionSelect('create')}
                  >
                    Create Ticket
                  </Button>
                  <Button
                    className="min-w-[350px] text-sm py-1"
                    onClick={() => setShowOptions(false)}
                  >
                    Back to Ticket Submission
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
