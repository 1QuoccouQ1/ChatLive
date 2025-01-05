import { FileText, X } from 'lucide-react'

interface GroupInfoProps {
  onClose: () => void
}

export default function GroupInfo({ onClose }: GroupInfoProps) {
  const members = [
    { name: 'John (Admin)', avatar: 'https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010_960_720.jpg' },
    { name: 'Sarah', avatar: 'https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383_960_720.jpg' },
    { name: 'Mike', avatar: 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg' },
    { name: 'Emily', avatar: 'https://cdn.pixabay.com/photo/2018/01/15/07/52/woman-3083390_960_720.jpg' },
  ]

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Group Info</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 max-h-[80vh] overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Project Team</h3>
            <p className="text-gray-600">A group for discussing our ongoing project.</p>
          </div>
          <div className="mb-6">
            <h4 className="text-md font-semibold mb-3 text-gray-700">Members ({members.length})</h4>
            <ul className="grid grid-cols-2 gap-4">
              {members.map((member, index) => (
                <li key={index} className="flex items-center bg-gray-100 rounded-lg p-2">
                  <img className="w-10 h-10 rounded-full mr-3 border-2 border-white" src={member.avatar} alt={member.name} />
                  <span className="text-sm font-medium text-gray-700">{member.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-3 text-gray-700">Shared Files</h4>
            <ul className="space-y-2">
              {['Project_Plan.pdf', 'Design_Mockups.zip'].map((file, index) => (
                <li key={index} className="flex items-center bg-gray-100 rounded-lg p-2">
                  <FileText className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="text-sm text-gray-700">{file}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

