import { NextResponse } from 'next/server';

export async function GET(request){
    try {

        return NextResponse.json({
            email: 'kashier@example.com',
            name: 'Kashier',
            joined: '2026-01-15',
            stats: {
                roomsJoined: 5,
                messagesSent: 42
            }

        });

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error'},
            { status: 500 }
        );
    }
}