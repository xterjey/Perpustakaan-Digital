<?php

// app/Notifications/KoleksiPribadiNotification.php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use App\Models\KoleksiPribadi;

class KoleksiPribadiNotification extends Notification
{
    use Queueable;

    protected $koleksiPribadi;

    public function __construct(KoleksiPribadi $koleksiPribadi)
    {
        $this->koleksiPribadi = $koleksiPribadi;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('Koleksi Pribadi Baru')
                    ->line('Anda telah menambahkan buku ke koleksi pribadi.')
                    ->line('Detail Koleksi Pribadi:')
                    ->line('ISBN: ' . $this->koleksiPribadi->buku->ISBN)
                    ->line('Buku: ' . $this->koleksiPribadi->buku->Judul)
                    ->line('Pengguna: ' . $this->koleksiPribadi->user->NamaLengkap)
                    ->action('Lihat Detail Koleksi Pribadi', url('https://jayourbae.biz.id/koleksi/' . $this->koleksiPribadi->id))
                    ->line('Terima kasih atas partisipasi Anda!');
    }

    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
