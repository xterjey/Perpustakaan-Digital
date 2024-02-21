<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Peminjaman;

class PeminjamanReturnNotification extends Notification
{
    use Queueable;

    protected $peminjaman;

    public function __construct(Peminjaman $peminjaman)
    {
        $this->peminjaman = $peminjaman;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('Pengembalian Buku')
                    ->line('Pengembalian buku telah berhasil.')
                    ->line('Detail Peminjaman:')
                    ->line('Tanggal Peminjaman: ' . $this->peminjaman->TanggalPeminjaman)
                    ->line('Tanggal Pengembalian: ' . $this->peminjaman->TanggalPengembalian)
                    ->line('Status: ' . $this->peminjaman->StatusPeminjaman)
                    ->action('Lihat Dan Pinjam Buku Buku Menarik Lainya', url('https://jayourbae.biz.id/login'))
                    ->line('Terima kasih atas penggunaan layanan kami.');
    }

    public function toArray($notifiable)
    {
        return [
        ];
    }
}
