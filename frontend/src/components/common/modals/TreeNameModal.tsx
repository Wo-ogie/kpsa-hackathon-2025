import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import Button from '../Button';

interface TreeNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onSave: (newName: string) => void;
}

const TreeNameModal: React.FC<TreeNameModalProps> = ({
  isOpen,
  onClose,
  currentName,
  onSave,
}) => {
  const [treeName, setTreeName] = useState(currentName);

  const handleSave = () => {
    if (treeName.trim()) {
      onSave(treeName.trim());
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[80%]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            키우시는 나무의<br /> 이름을 변경해주세요.
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          <div className="relative">
            <input
              type="text"
              value={treeName}
              onChange={(e) => setTreeName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="튼튼이"
              maxLength={20}
              className="w-full text-2xl font-medium bg-transparent border-none outline-none placeholder-gray-400 pb-2"
              autoFocus
            />
            <div className="h-0.5 bg-gray-300"></div>
          </div>
        </div>

        <div className="mt-8">
          <Button
            onClick={handleSave}
            variant="secondary"
            size="lg"
            fullWidth
            disabled={!treeName.trim()}
          >
            변경 완료
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TreeNameModal; 