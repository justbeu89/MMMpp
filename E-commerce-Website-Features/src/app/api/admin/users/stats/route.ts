// app/api/admin/stats/route.ts
import { sql } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get total users
    const totalUsersResult = await sql`SELECT COUNT(*) as count FROM users`;
    const totalUsers = parseInt(totalUsersResult[0].count);

    // Get active users (users who have logged in within last 30 days)
    // For now, we'll use a simple calculation based on recent signups
    const activeUsersResult = await sql`
      SELECT COUNT(*) as count 
      FROM users 
      WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
    `;
    const activeUsers = parseInt(activeUsersResult[0].count);

    // Get admin users
    const adminUsersResult = await sql`
      SELECT COUNT(*) as count 
      FROM users 
      WHERE role = 'admin'
    `;
    const adminUsers = parseInt(adminUsersResult[0].count);

    // Get new users today
    const newUsersTodayResult = await sql`
      SELECT COUNT(*) as count 
      FROM users 
      WHERE DATE(created_at) = CURRENT_DATE
    `;
    const newUsersToday = parseInt(newUsersTodayResult[0].count);

    const stats = {
      totalUsers,
      activeUsers,
      adminUsers,
      newUsersToday
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}