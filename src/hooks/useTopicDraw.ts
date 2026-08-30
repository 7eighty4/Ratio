import { useState, useCallback, useRef } from 'react';
import type { Topic, TopicCategory, Difficulty } from '../types';
import { TOPICS } from '../data/topics';

interface UseTopicDrawProps {
  selectedCategories?: TopicCategory[];
  selectedDifficulty?: Difficulty;
}

export function useTopicDraw({
  selectedCategories = [],
  selectedDifficulty = 'mixed'
}: UseTopicDrawProps = {}) {
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [drawnCount, setDrawnCount] = useState<number>(0);
  const recentTopicsRef = useRef<string[]>([]);

  const getFilteredTopics = useCallback(() => {
    return TOPICS.filter((topic) => {
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(topic.category)) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== 'mixed' && topic.difficulty !== selectedDifficulty) {
        return false;
      }
      return true;
    });
  }, [selectedCategories, selectedDifficulty]);

  const drawTopic = useCallback((): Topic => {
    let pool = getFilteredTopics();

    // Fallback if pool empty due to strict filters
    if (pool.length === 0) {
      pool = TOPICS;
    }

    // Filter out recently drawn topics if pool is large enough
    const maxRecentBuffer = Math.min(15, Math.floor(pool.length * 0.4));
    let availablePool = pool.filter((t) => !recentTopicsRef.current.includes(t.id));

    if (availablePool.length === 0) {
      // Clear recent buffer if all available topics have been drawn
      recentTopicsRef.current = [];
      availablePool = pool;
    }

    const randomIndex = Math.floor(Math.random() * availablePool.length);
    const selected = availablePool[randomIndex];

    // Update anti-repeat queue
    recentTopicsRef.current = [selected.id, ...recentTopicsRef.current].slice(0, maxRecentBuffer);
    
    setCurrentTopic(selected);
    setDrawnCount((prev) => prev + 1);

    return selected;
  }, [getFilteredTopics]);

  const setSpecificTopic = useCallback((topic: Topic) => {
    setCurrentTopic(topic);
  }, []);

  return {
    currentTopic,
    drawnCount,
    drawTopic,
    setSpecificTopic,
    totalAvailable: getFilteredTopics().length
  };
}
