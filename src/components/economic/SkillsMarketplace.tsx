import React, { useState } from 'react';
import { Briefcase, Star, Book, Award, Users } from 'lucide-react';
import { useI18nStore } from '../../store/i18nStore';

interface Skill {
  id: string;
  name: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'expert';
  rating: number;
  completedJobs: number;
  hourlyRate: number;
}

export function SkillsMarketplace() {
  const { t } = useI18nStore();
  const [skills] = useState<Skill[]>([
    {
      id: 's1',
      name: t('skills.delivery.name'),
      description: t('skills.delivery.description'),
      level: 'expert',
      rating: 4.9,
      completedJobs: 150,
      hourlyRate: 2500
    },
    {
      id: 's2',
      name: t('skills.logistics.name'),
      description: t('skills.logistics.description'),
      level: 'intermediate',
      rating: 4.7,
      completedJobs: 75,
      hourlyRate: 3000
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl">
        <div className="flex items-center mb-4">
          <Briefcase className="h-8 w-8 mr-3" />
          <h2 className="text-2xl font-bold">{t('skills.title')}</h2>
        </div>
        <p className="text-blue-100">{t('skills.subtitle')}</p>
      </div>

      <div className="grid gap-6">
        {skills.map((skill) => (
          <div key={skill.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{skill.name}</h3>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{skill.rating}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-600">
                    {skill.completedJobs} {t('skills.jobsCompleted')}
                  </span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                skill.level === 'expert'
                  ? 'bg-blue-100 text-blue-800'
                  : skill.level === 'intermediate'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
              }`}>
                {t(`skills.levels.${skill.level}`)}
              </span>
            </div>

            <p className="text-gray-600 mb-4">{skill.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Book className="h-5 w-5 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">{t('skills.training')}</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">{t('skills.certification')}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-lg font-medium text-gray-900">
                  {skill.hourlyRate} FCFA
                </span>
                <span className="text-sm text-gray-500">{t('skills.perHour')}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                  >
                    <Users className="h-4 w-4 text-gray-600" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-gray-600">+8</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {t('skills.hire')}
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
        {t('skills.listSkill')}
      </button>
    </div>
  );
}