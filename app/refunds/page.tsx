
export default function Refunds(){
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold">Training Refund Policy</h1>
      <p className="mt-4 text-slate-700">We offer clear, fair refunds for training enrollments.</p>
      <ul className="list-disc pl-6 mt-4 text-slate-700 space-y-1">
        <li>100% refund up to 7 days before the course start date.</li>
        <li>50% refund within 7 days of start date.</li>
        <li>No refund after attending the first session; seat transfers allowed.</li>
        <li>Corporate cohorts subject to MSA/SOW terms.</li>
      </ul>
      <p className="mt-4 text-slate-700">To request a refund, email training@ripotek.ca with your order details.</p>
    </div>
  );
}
