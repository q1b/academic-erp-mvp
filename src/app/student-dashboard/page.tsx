import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const classrooms = [
    {
      subject: 'Pattern Recognition & Anomaly Detection',
      program: 'B.Tech 7th (AIML)',
      teacher: 'Ms Aradhana Kar'
    },
    {
      subject: 'Deep Learning',
      program: 'B.Tech 7th (AIML)',
      teacher: 'Dr. Chinmaya Kumar Nayak'
    },
    {
      subject: 'Compiler Design',
      program: 'B.Tech 7th (AIML/DS/CSCD)',
      teacher: 'Ms Aradhana Kar'
    },
    {
      subject: 'Natural Language Processing & Machine Learning',
      program: 'B.Tech 7th (AIML)',
      teacher: 'Dr. Deepak Sahoo'
    },
    {
      subject: 'Applications of Machine Learning',
      program: 'B.Tech 7th (AIML)',
      teacher: 'Dr. Anil Kumar'
    }
  ]
  return (
    <main className="w-full max-w-screen-xl grid grid-cols-3 gap-12 px-4">
      {classrooms.map(classroom => (
        <Card key={classroom.subject} className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>{classroom.subject}</CardTitle>
            <CardDescription>{classroom.program}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{classroom.teacher}</p>
          </CardContent>
        </Card>
      ))}
    </main>
  );
}
