/**
 * This file contains utility functions that are used in multiple components.
 */
export const useUtils = () => {

  // convert unix timestamps to formatted times (hh:mm)
  const timestampToRegularTime = (priceData: number[]) => {
    return priceData?.map(timestamp =>
      new Date(timestamp * 1000).toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit'
      })
    );
  }

  // get the current date in the format "Monday, 1. January 2024"
  const getTodayDateLong = () => {
    return new Date().toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // get the current time in the format "12:34"
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // get timestamps of yesterday 00:00:00 and 23:59:59
  const getYesterdayTimestamps = (variant: 'start' | 'end') => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (variant === 'start') {
      yesterday.setHours(0, 0, 0, 0);
    } else {
      yesterday.setHours(23, 59, 59, 999);
    }
    return Math.floor(yesterday.getTime() / 1000);
  }

  // get timestamps of today 00:00:00 and 23:59:59 -1 year
  const getTodayTimestampsOneYearAgo = (variant: 'start' | 'end') => {
    const today = new Date();
    const todayOneYearAgo = new Date(today);
    todayOneYearAgo.setFullYear(today.getFullYear() - 1);
    if (variant === 'start') {
      todayOneYearAgo.setHours(0, 0, 0, 0);
    } else {
      todayOneYearAgo.setHours(23, 59, 59, 999);
    }
    return Math.floor(todayOneYearAgo.getTime() / 1000);
  }


  return {
    timestampToRegularTime,
    getTodayDateLong,
    getCurrentTime,
    getYesterdayTimestamps,
    getTodayTimestampsOneYearAgo,
  }
}